import { useEffect, useState } from "react";
import { enGB } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Link, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import moment from "moment";
import {
  RedirectUrlResponse,
  ShortUrlData,
  ShortUrlResponse,
} from "../../api/types";
import { createShortUrl, redirectUrl } from "../../api/requests";
import { CreationFormSchema, TCreationFormSchema } from "./schema";
import { AxiosError } from "axios";

export const CreationForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrlError, setShortUrlError] = useState("");

  const {
    formState: { errors, isValid },
    control,
    trigger,
    handleSubmit,
  } = useForm<TCreationFormSchema>({
    mode: "onChange",
    resolver: zodResolver(CreationFormSchema),
  });

  const shortUrlParams = window.location.pathname.substring(1);

  const { data, error } = useQuery<
    RedirectUrlResponse,
    AxiosError<{ error: string }>
  >({
    queryKey: ["params"],
    queryFn: () => {
      return redirectUrl(shortUrlParams);
    },
    retry: false,
  });

  const { mutate } = useMutation<
    ShortUrlResponse,
    AxiosError<{ error: string }>,
    ShortUrlData
  >({
    mutationFn: createShortUrl,
    onSuccess: (response) => {
      console.log(response);
      setShortUrl(response.shortUrl);
      setShortUrlError("");
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        setShortUrlError(error.response.data.error);
        setShortUrl("");
      } else {
        console.error("Error creating short url:", error);
        setShortUrlError(error.message);
        setShortUrl("");
      }
    },
  });

  if (data?.originalUrl) {
    window.location.href = data.originalUrl;
  }

  useEffect(() => {
    if (error?.response) {
      setShortUrl("");
      setShortUrlError(error.response.data.error);
    }
  }, [error]);

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
    const newUrl = {
      originalUrl: data.originalUrlLabel,
      expiresAt: data.expiresAtLabel,
      alias: data.aliasLabel,
    };

    mutate(newUrl);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <form className="auth-form" onSubmit={handleSubmit(handleForm)}>
        <div className="form-input__block">
          <label>Original url</label>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                onChange={(ev) => onChange(ev)}
                value={value ? value.toString() : ""}
                helperText={errors["originalUrlLabel"]?.message?.toString()}
              />
            )}
            name="originalUrlLabel"
          />
        </div>
        <div className="form-input__block">
          <label>Expiration date</label>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <DatePicker
                value={null}
                onChange={(value) => {
                  onChange(moment(value).format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: errors["expiresAtLabel"]?.message?.toString(),
                  },
                }}
                disablePast
              />
            )}
            name="expiresAtLabel"
          />
        </div>
        <div className="form-input__block">
          <label>Your alias</label>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                onChange={(ev) => onChange(ev)}
                value={value ? value.toString() : ""}
                helperText={errors["aliasLabel"]?.message?.toString()}
              />
            )}
            name="aliasLabel"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          disabled={isDisabled}
          onClick={() => setIsClicked(true)}
        >
          Submit
        </Button>
      </form>
      {shortUrl && (
        <Alert severity="success">
          <Link href={shortUrl}>{shortUrl}</Link>
        </Alert>
      )}
      {shortUrlError && <Alert severity="error">{shortUrlError}</Alert>}
    </LocalizationProvider>
  );
};
