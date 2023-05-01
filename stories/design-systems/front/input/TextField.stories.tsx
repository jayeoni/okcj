import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TextField, { TextFieldProps } from 'src/components/input/TextField';

export default {
  title: 'Design Systems/Front/Input/TextField',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphonex',
    },
  },
  args: {
    label: 'Label',
    helper: '',
    placeholder: 'Placeholder',
    disabled: false,
    isSuccess: false,
  },
};

export const Default = (args: TextFieldProps) => {
  return <TextField {...args} className="max-w-[350px]" />;
};

export const Filled = (args: TextFieldProps) => {
  return (
    <TextField {...args} className="max-w-[350px]" value={'입력한 정보'} />
  );
};

export const Focus = (args: TextFieldProps) => {
  return <TextField {...args} className="max-w-[350px]" autoFocus />;
};

export const DisabledWithValue = (args: TextFieldProps) => {
  return (
    <TextField
      {...args}
      className="max-w-[350px]"
      disabled
      value={'입력한 정보'}
    />
  );
};

export const Error = (args: TextFieldProps) => {
  return (
    <TextField
      {...args}
      className="max-w-[350px]"
      helper="오류 메시지 텍스트"
    />
  );
};

export const Success = (args: TextFieldProps) => {
  return <TextField {...args} className="max-w-[350px]" isSuccess />;
};
