import { ref, reactive } from "vue";

interface ValidationRule<T> {
  (value: any, formData: T): boolean | string;
}

interface UseFormOptions<T> {
  initialData: T;
  validationRules: Record<keyof T, ValidationRule<T>>;
  onSubmit: (data: T) => Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialData,
  validationRules,
  onSubmit,
}: UseFormOptions<T>) {
  const formData = ref<T>({ ...initialData });
  const errors = ref<Record<keyof T, string>>({} as Record<keyof T, string>);
  const isLoading = ref(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const result = validationRules[field](formData.value[field], formData.value);
      if (result !== true) {
        newErrors[field] = result as string;
        isValid = false;
      }
    });

    errors.value = newErrors as Record<keyof T, string>;
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    isLoading.value = true;
    try {
      await onSubmit(formData.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    formData,
    errors,
    isLoading,
    validateForm,
    handleSubmit,
  };
} 