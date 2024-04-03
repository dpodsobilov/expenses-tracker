import { useEffect, useState } from "react";
import { useAppDispatch } from "./redux-hooks";
import { clearError } from "../store/slices/authSlice";

type ValueType = string;

export function useInput(
  initialValue: ValueType,
  validations: Record<string, string | number | boolean>
) {
  const [value, setValue] = useState<ValueType>(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);
  const dispatch = useAppDispatch();

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(e.target.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setIsDirty(true);
    dispatch(clearError());
  }

  return { value, isDirty, onChange, onBlur, ...valid };
}

export function useValidation(
  value: ValueType,
  validations: Record<string, string | number | boolean>
) {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  useEffect(
    function () {
      for (const validation in validations) {
        switch (validation) {
          case "minLength":
            if (typeof validations[validation] === "number")
              if (value.length < validations[validation]) {
                setMinLengthError(true);
                setError(`Минимальная длина ${validations[validation]}`);
              } else {
                setMinLengthError(false);
                setError("");
              }
            break;
          case "maxLength":
            if (typeof validations[validation] === "number")
              if (value.length > validations[validation]) {
                setMaxLengthError(true);
                setError(`Максимальная длина ${validations[validation]}`);
              } else {
                setMaxLengthError(false);
                setError("");
              }
            break;
          case "isEmpty":
            if (value) {
              setIsEmpty(false);
              setError("");
            } else {
              setIsEmpty(true);
              setError("Поле не должно быть пустым");
            }
            break;
          case "isEmail":
            // eslint-disable-next-line no-case-declarations
            const re =
              // eslint-disable-next-line no-useless-escape
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test(String(value).toLowerCase())) {
              setEmailError(false);
              setError("");
            } else {
              setEmailError(true);
              setError("Email не корректен");
            }
            break;
        }
      }
    },
    [validations, value]
  );

  useEffect(
    function () {
      if (isEmpty || minLengthError || maxLengthError || emailError) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    },
    [emailError, isEmpty, maxLengthError, minLengthError]
  );

  return { isEmpty, minLengthError, emailError, inputValid, error };
}
