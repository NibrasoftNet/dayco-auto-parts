"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductSearchInputs {
  partNumber?: string;
  maker?: string;
  model?: string;
  year?: string;
  application?: string;
}

interface ProductSearchFormProps {
  onSearch: (values: ProductSearchInputs) => void;
  loading?: boolean;
}

export default function ProductSearchForm({
  onSearch,
  loading = false,
}: ProductSearchFormProps) {
  const { handleSubmit, control, reset } = useForm<ProductSearchInputs>({
    defaultValues: {
      partNumber: "",
      maker: "",
      model: "",
      year: "",
      application: "",
    },
  });

  const onSubmit: SubmitHandler<ProductSearchInputs> = (data) => {
    onSearch(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      <Controller
        name="partNumber"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Ref #" />}
      />
      <Controller
        name="maker"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Maker" />}
      />
      <Controller
        name="model"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Model" />}
      />
      <Controller
        name="year"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Year" />}
      />
      <Controller
        name="application"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Application" />}
      />

      <div className="col-span-full mt-2 flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
          disabled={loading}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
