import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string;
}

function FormSuccess(props: FormSuccessProps) {
  if (!props.message) return null;

  return (
    <div
      className="flex items-center gap-x-2 rounded-md bg-emerald-700/15
    p-3 text-sm text-emerald-700 dark:bg-emerald-400 dark:text-emerald-900"
    >
      <FaCheckCircle className="h-4 w-4" />
      {props.message}
    </div>
  );
}

export default FormSuccess;
