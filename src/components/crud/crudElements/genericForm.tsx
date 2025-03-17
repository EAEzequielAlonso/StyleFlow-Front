import { useState } from 'react';

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date' | 'image';
  options?: Array<{ value: string; label: string }>;
  dependsOn?: string;
}

interface GenericFormProps<T> {
  initialData: T;
  fields: FieldConfig[];
  onSubmit: (data: T) => void;
  onCancel: () => void;
  isEditing: boolean;
  relatedData: { [key: string]: Array<{ id: string; name: string }> };
  onFetchDependentOptions?: (field: string, dependencyValue: string) => Promise<Array<{ value: string; label: string }>>;
}

export const GenericForm = <T extends {}>({
  initialData,
  fields,
  onSubmit,
  onCancel,
  isEditing,
  relatedData,
  onFetchDependentOptions,
}: GenericFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [dependentOptions, setDependentOptions] = useState<Record<string, Array<{ value: string; label: string }>>>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const dependentField = fields.find((f) => f.dependsOn === field);
    if (dependentField && onFetchDependentOptions) {
      onFetchDependentOptions(dependentField.name, value).then((options) => {
        setDependentOptions((prev) => ({ ...prev, [dependentField.name]: options }));
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getFieldOptions = (field: FieldConfig) => {
    if (field.dependsOn && dependentOptions[field.name]) {
      return dependentOptions[field.name];
    }
    if (relatedData[field.name]) {
      return relatedData[field.name].map((item) => ({ value: item.id, label: item.name }));
    }
    return field.options || [];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-2">{field.label}</label>
          {field.type === 'select' ? (
            <select
              value={(formData as any)[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full p-2 border rounded"
              disabled={field.dependsOn && !(formData as any)[field.dependsOn]}
            >
              <option value="">Seleccione...</option>
              {getFieldOptions(field).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={(formData as any)[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};