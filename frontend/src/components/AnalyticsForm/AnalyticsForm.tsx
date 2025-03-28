import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getAnalytics } from "../../api/requests";
import { AnalyticsFormSchema, TAnalyticsFormSchema } from "./schema";
import { AnalyticsResponse } from "../../api/types";

export const AnalyticsForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const queryClient = useQueryClient();
  
  const {
    formState: { errors, isValid },
    control,
    trigger,
    handleSubmit,
  } = useForm<TAnalyticsFormSchema>({
    mode: "onChange",
    resolver: zodResolver(AnalyticsFormSchema),
  });

  const { data, error, refetch } = useQuery<
    AnalyticsResponse,
    AxiosError<{ error: string }>
  >({
    queryKey: ["analytics", shortUrl],
    queryFn: async () => {
      const shortUrl = queryClient.getQueryData<string>(["analyticsShortUrl"]);
      if (!shortUrl) throw new Error("No short URL provided");
      return getAnalytics(shortUrl);
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
    queryClient.setQueryData(["analyticsShortUrl"], transformedUrl);
    refetch();
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
        Show report
      </Button>

      {error ? (
        <Alert severity="error">{error.response?.data.error}</Alert>
      ) : data ? (
        <Alert severity="success" className="alert-list">
          <p>Last IP addresses:</p>
          <ul>
            {data.ipAddresses?.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
          <p>{`Click count: ${data.clickCount}`}</p>
        </Alert>
      ) : null}
    </form>
  );
};
