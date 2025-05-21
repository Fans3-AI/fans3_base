import { useContext } from "react";
import { TranslateContext } from "../context";

export default function useTranslate() {
  const translate = useContext(TranslateContext);
  return translate;
}