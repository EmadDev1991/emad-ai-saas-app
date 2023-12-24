"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./contansts";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";
import { useProModal } from "@/app/hooks/use-pro-modal";

// Define a type for the user messages
type ChatCompletionRequestMessage = {
  role: string;
  content: string;
};

type ChatProps = {
  question: string;
  answer: string;
};

const CodeGenerationPage = () => {
  const proModal = useProModal();
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

      const response = await axios.post("/api/code", {
        messages: newUserMessage,
      });

      console.log(response.data);

      setMessages((current) => [...current, userMessage]);

      if (response.status === 200 && response.data) {
        setChats((current) => [
          ...current,
          { question: values.prompt, answer: response.data },
        ]);
        form.reset();
      }
    } catch (error: any) {
      /// TO DO open pro modal
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="max-w-[1400px] m-auto">
      <Heading
        title="Code Generation"
        description="Generate Code using descriptive text "
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                      placeholder="I can help you with your code. Try me"
                      className="  bg-transparent focus-visible:ring-offset-0 border-none  focus-within:ring-0 "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              className=" col-span-12 lg:col-span-2 bg-primary bg-green-700 hover:bg-green-800 "
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      <div>
        {messages.length === 0 && !isLoading && (
          <p className="p-4 text-center text-xl font-thin text-zinc-300 ">
            No generated content yet. start asking
          </p>
        )}
        {chats.map((chat, index) => (
          <div key={index} className="p-4 lg:px-8 bg-[#141d2f] m-6 rounded-lg ">
            <p className="text-xl font-bold pb-4 text-green-400">
              {chat.question}
            </p>
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className="overflow-auto w-full my-2 bg-[#111827] text-white p-2 rounded-lg">
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => (
                  <code {...props} className=" font-bold" />
                ),
              }}
              className="text-sm overflow-hidden leading-7"
            >
              {chat.answer || ""}
            </ReactMarkdown>
          </div>
        ))}

        {isLoading && (
          <div className="mx-4 m-4 lg:mx-6 bg-[#141d2f] rounded-md flex justify-center items-center flex-col gap-2 p-4  ">
            <Loader className="animate-spin" />
            <p className="text-zinc-400">Emad AI thinking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGenerationPage;
