"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define a type for the user messages
type ChatCompletionRequestMessage = {
  role: string;
  content: string;
};

type ChatProps = {
  question: string;
  answer: string;
};

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
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
      const userMessage = { role: "user", content: values.prompt };
      const newUserMessage = [...messages, userMessage];

      const response = await axios.post(
        "http://localhost:3001/api/conversation",
        {
          messages: newUserMessage,
        }
      );

      setMessages((current) => [...current, userMessage]);

      if (response.status === 200 && response.data) {
        setChats((current) => [
          ...current,
          { question: values.prompt, answer: response.data },
        ]);
        form.reset();
      }
    } catch (error) {
      /// TO DO open pro modal
      console.log("error");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="max-w-[1400px] m-auto">
      <Heading
        title="Conversation"
        description="Our most advanced conversation AI model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                      placeholder="What you would like to know? Ask me anything"
                      className="  bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 border-none  focus-within:ring-0 "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              className=" col-span-12 lg:col-span-2 bg-primary bg-purple-500 hover:bg-purple-700 "
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      <div className="p-4">
        {messages.length === 0 && !isLoading && (
          <p className="text-center text-xl font-thin text-zinc-300 ">
            No generated content yet. start asking
          </p>
        )}
        {chats.map((chat, index) => (
          <div
            key={index}
            className="p-4  bg-[#141d2f] my-6 mx-4 rounded-lg text-purple-600"
          >
            <p className="text-xl font-bold pb-4">{chat.question}</p>
            <p className="text-gray-300 text-[14px]  leading-7 ">
              {chat.answer}
            </p>
          </div>
        ))}
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

export default ConversationPage;
