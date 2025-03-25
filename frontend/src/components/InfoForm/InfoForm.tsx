import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { InfoUrlResponse } from "../../api/types";
import { getUrlInfo } from "../../api/requests";
import { InfoFormSchema, TInfoFormSchema } from "./schema";

export const InfoForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const queryClient = useQueryClient();
  
  const {
    formState: { errors, isValid },
    control,
    trigger,
    handleSubmit,
  } = useForm<TInfoFormSchema>({
    mode: "onChange",
    resolver: zodResolver(InfoFormSchema),
  });

  const { data, error, refetch } = useQuery<
    InfoUrlResponse,
    AxiosError<{ error: string }>
  >({
    queryKey: ["info", shortUrl],
    queryFn: async () => {
      const shortUrl = queryClient.getQueryData<string>(["currentShortUrl"]);
      if (!shortUrl) throw new Error("No short URL provided");
      return getUrlInfo(shortUrl);
    },
    retry: false,
    enabled: false,
    staleTime: 0,
    gcTime: 0
  });

  useEffect(() => {
    if (shortUrl) {
      refetch();
      setShortUrl("");
    }
  }, [shortUrl]);

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
    queryClient.setQueryData(["currentShortUrl"], transformedUrl);
    refetch();
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(handleForm)}>
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
        onClick={() => setIsClicked(true)}
      >
        Get info
      </Button>

      {error ? (
        <Alert severity="error">{error.response?.data.error}</Alert>
      ) : data ? (
        <Alert severity="success">
          <ul>
            <li>{data.originalUrl}</li>
            <li>{data.createdAt}</li>
            <li>{data.clickCount}</li>
          </ul>
        </Alert>
      ) : null}
    </form>
  );
};
