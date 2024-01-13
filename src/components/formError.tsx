import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

function FormError(props: FormErrorProps) {
  if (!props.message) return null;

  return (
    <div
      className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3
    text-sm text-destructive dark:bg-rose-400 dark:text-rose-900"
    >
      <FaExclamationTriangle className="h-4 w-4" />
      {props.message}
    </div>
  );
}

export default FormError;
