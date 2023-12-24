"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/app/hooks/use-pro-modal";




const VideoGenerationPage = () => {
  const proModal = useProModal()
  const router = useRouter();
  const [video, setVideo] = useState<string>();


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
      setVideo(undefined)
      const response = await axios.post( "/api/video", values );
    
      setVideo(response.data[0]);
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

  console.log(video)

  return (
    <div className="max-w-[1400px] m-auto">
      <Heading
        title="Video Generation"
        description="Turn your prompt into Video"
        icon={Video}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
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
                      placeholder="a fox jumping on a grass field"
                      className="  bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 border-none  focus-within:ring-0 "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              className=" col-span-12 lg:col-span-2 bg-primary bg-orange-500 hover:bg-orange-700 "
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      <div className="p-4">
        {!video && !isLoading && (
          <p className="text-center text-xl font-thin text-zinc-300 ">
            No video generated yet. Give it a try
          </p>
        )}
        <div className="">
         {video && (
          <video className="w-full aspect-video mt-8 rounded-md border bg-black" controls>
            <source src={video}/>
          </video>
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

export default VideoGenerationPage;
