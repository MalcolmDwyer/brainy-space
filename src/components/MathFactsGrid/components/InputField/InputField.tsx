import { useGameProgress, useInputField } from "../../hooks";

export function InputField() {
  const { activeCard } = useGameProgress();
  const { placeholder, onKeyUp, inputRef } = useInputField({
    activeCard,
  });

  return (
    <input
      ref={inputRef}
      type="text"
      onKeyUp={onKeyUp}
      placeholder={placeholder}
    />
  );
}
