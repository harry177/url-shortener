import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, TextField } from "@mui/material";
import { deleteUrl } from "../../api/requests";
import { DeletionFormSchema, TDeletionFormSchema } from "./schema";
import { AxiosError } from "axios";

export const DeletionForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [deleteUrlSuccess, setDeleteUrlSuccess] = useState("");
  const [deleteUrlError, setDeleteUrlError] = useState("");

  const {
    formState: { errors, isValid },
    control,
    trigger,
    handleSubmit,
  } = useForm<TDeletionFormSchema>({
    mode: "onChange",
    resolver: zodResolver(DeletionFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      setDeleteUrlSuccess("Short url deleted sucessfully!");
      setDeleteUrlError("");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data?.error) {
        setDeleteUrlError(error.response.data.error);
        setDeleteUrlSuccess("");
      } else {
        console.error("Error deleting short url:", error);
        setDeleteUrlError(error.message);
        setDeleteUrlSuccess("");
      }
    },
  });

  useEffect(() => {
    if (!isValid && isClicked) {
      trigger();
      setIsDisabled(true);
      setIsClicked(false);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isValid) {
      setIsDisabled(false);
    }
  }, [isValid]);

  const handleForm: SubmitHandler<FieldValues> = (data) => {
    const transformedUrl = data.shortUrlLabel.slice(
      data.shortUrlLabel.lastIndexOf("/") + 1
    );
    mutate(transformedUrl);
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleForm)}>
      <div className="form-input__block">
        <label>Short url</label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              onChange={(ev) => onChange(ev)}
              value={value ? value.toString() : ""}
              helperText={errors["shortUrlLabel"]?.message?.toString()}
            />
          )}
          name="shortUrlLabel"
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        disabled={isDisabled}
        className="button"
        onClick={() => setIsClicked(true)}
      >
        Delete
      </Button>
      {deleteUrlSuccess && <Alert severity="success">{deleteUrlSuccess}</Alert>}
      {deleteUrlError && <Alert severity="error">{deleteUrlError}</Alert>}
    </form>
  );
};
