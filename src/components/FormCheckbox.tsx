interface FormCheckboxProps {
  handleToggleCheckbox: () => void;
  isChecked: boolean;
}

function FormCheckbox({ handleToggleCheckbox, isChecked }: FormCheckboxProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={isChecked}
          onChange={handleToggleCheckbox}
        />
        <span className="label-text">I agree</span>
      </label>
    </div>
  );
}

export default FormCheckbox;
