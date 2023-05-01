import { useState } from 'react';
import Select, { SelectItem, SelectProps } from 'src/components/select/Select';

export default {
  title: 'Design Systems/Front/Select/Select',
  args: {
    label: '',
  },
};

export const Default = (args: SelectProps) => {
  const values = [
    { id: 1, label: '1번 선택지', value: 1 },
    { id: 2, label: '2번 선택지', value: 2 },
    { id: 3, label: '3번 선택지', value: 3 },
    { id: 4, label: '4번 선택지', value: 4 },
    { id: 5, label: '5번 선택지', value: 5 },
  ];
  const [value, setValue] = useState<SelectItem>();
  return (
    <Select
      {...args}
      values={values}
      value={value}
      onChange={(value: any) => setValue(value)}
      placeholder="선택해주세요"
    />
  );
};

export const WithLabel = (args: SelectProps) => {
  const values = [
    { id: 1, label: '1번 선택지', value: 1 },
    { id: 2, label: '2번 선택지', value: 2 },
    { id: 3, label: '3번 선택지', value: 3 },
    { id: 4, label: '4번 선택지', value: 4 },
    { id: 5, label: '5번 선택지', value: 5 },
  ];
  const [value, setValue] = useState<SelectItem>();
  return (
    <Select
      {...args}
      values={values}
      value={value}
      onChange={(value: any) => setValue(value)}
      placeholder="선택해주세요"
    />
  );
};
WithLabel.args = {
  label: '라벨입니다',
};
