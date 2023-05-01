import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TextArea, { TextAreaProps } from 'src/components/input/TextArea';

export default {
  title: 'Design Systems/Front/Input/TextArea',
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
  },
};

export const Default = (args: TextAreaProps) => {
  return <TextArea {...args} />;
};

export const Filled = (args: TextAreaProps) => {
  return <TextArea {...args} value={'입력한 정보'} />;
};

export const Focus = (args: TextAreaProps) => {
  return <TextArea {...args} autoFocus />;
};

export const DisabledWithValue = (args: TextAreaProps) => {
  return <TextArea {...args} disabled value={'입력한 정보'} />;
};

export const Error = (args: TextAreaProps) => {
  return <TextArea {...args} helper="Error message" />;
};
