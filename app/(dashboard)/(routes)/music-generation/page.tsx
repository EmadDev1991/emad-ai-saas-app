"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/app/hooks/use-pro-modal";



type ChatProps = {
  question: string;
  answer: string;
};

const MusicGenerationPage = () => {
  const proModal = useProModal()
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const [chats, setChats] = useState<ChatProps[]>([]);

  ///1  define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // define loading state
  const isLoading = form.formState.isSubmitting;

  //define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      console.log(values)
      setMusic(undefined)
      const response = await axios.post( "http://localhost:3001/api/music", values );
    
      setMusic(response.data.audio);
      form.reset();

     
    } catch (error:any) {
      /// TO DO open pro modal
      if(error?.response?.status === 403){
        proModal.onOpen()
      }
    } finally {
      router.refresh();
    }
  };

  console.log(music)

  return (
    <div className="max-w-[1400px] m-auto">
      <Heading
        title="Music Generation"
        description="Turn your prompt into music"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full rounded-lg border border-gray-700 p-4 px-3 md:px-6 grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className=" col-span-12 lg:col-span-10 ">
                  <FormControl className="m-0 p-0">
                    <Input
                      type="text"
                      placeholder="guitar solo"
                      className="  bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 border-none  focus-within:ring-0 "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              className=" col-span-12 lg:col-span-2 bg-primary bg-emerald-500 hover:bg-emerald-700 "
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      <div className="p-4">
        {!music && !isLoading && (
          <p className="text-center text-xl font-thin text-zinc-300 ">
            No music generated yet. Give it a try
          </p>
        )}
        <div className="">
         {music && (
          <audio controls className="w-full mt-8 ">
            <source src={music}/>
          </audio>
         )}
        </div>
        {isLoading && (
          <div className="mx-4 bg-[#141d2f] rounded-md flex justify-center items-center flex-col gap-2 p-4  ">
            <Loader className="animate-spin" />
            <p className="text-zinc-400">Emad AI thinking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicGenerationPage;
