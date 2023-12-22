"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {  resolutionOptions } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ImageGenerationPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  ///1  define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "1024x1024",
    },
  });

  // define loading state
  const isLoading = form.formState.isSubmitting;

  //define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      /// reset all old images
      setImages([]);

      const response = await axios.post(
        "http://localhost:3001/api/image-generation",
        values
      );

      console.log(response);

      const generatedImagesUrls = response.data.map(
        (image: { url: string }) => image.url
      );

      setImages(generatedImagesUrls);
      form.reset()
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
        title="Image Generation"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-600"
        bgColor="bg-pink-600/10"
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
                <FormItem className=" col-span-12 lg:col-span-6 pb-4 lg:pb-0 ">
                  <FormControl className="m-0 p-0">
                    <Input
                      type="text"
                      placeholder="describe your images to be generated here"
                      className="  bg-transparent focus-visible:ring-offset-0 border-none  focus-visible:ring-0 "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

         

            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" col-span-12 sm:col-span-4  lg:col-span-3 ">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className=" bg-transparent focus:ring-offset-transparent text-white text-xs">
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                    <SelectContent className="bg-foreground text-white">
                      {resolutionOptions.map((resolution) => (
                        <SelectItem
                          key={resolution.label}
                          value={resolution.value}
                        >
                          {resolution.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="  col-span-12 sm:col-span-4 lg:col-span-3  flex justify-right items-center gap-3   ">
              <Button
                className="w-full bg-pink-700 hover:bg-pink-900"
                disabled={isLoading}
              >
                Generate
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="py-4">
        {images.length === 0 && !isLoading && (
          <p className="text-center text-xl font-thin text-zinc-300 ">
            No generated images yet. try It
          </p>
        )}
      </div>

      {isLoading && (
          <div className="mx-8 bg-[#141d2f] rounded-md flex justify-center items-center flex-col gap-2 p-4  ">
            <Loader className="animate-spin" />
            <p className="text-zinc-400">Emad AI thinking</p>
          </div>
        )}

      <div className=" px-4  mt-8">
        {images.map((image, index) => (
          <Card
            key={image}
            className=" border-none bg-[#141d2f] rounded-lg overflow-hidden p-4"
          >
            <div className="relative aspect-square">
              <Image alt="image" fill src={image} sizes="1024px" className="rounded-md aspect-square" />
            </div>
            <CardFooter className="px-0 py-2 ">
              <Button
                onClick={() => window.open(image)}
                className="w-full  bg-pink-700 hover:bg-pink-900"
              >
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageGenerationPage;
