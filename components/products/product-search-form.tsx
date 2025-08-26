"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6"
    >
      <Controller
        name="partNumber"
        control={control}
        render={({ field }) => <Input {...field} placeholder="Part #" />}
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

      <div className="flex col-span-full gap-2 mt-2">
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
