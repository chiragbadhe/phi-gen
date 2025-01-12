interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mb-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
      <p>{message}</p>
    </div>
  );
}
