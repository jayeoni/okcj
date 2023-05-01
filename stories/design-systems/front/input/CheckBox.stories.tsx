import Checkbox from 'src/components/input/Checkbox';
import { Label } from 'src/components/label/Label';

export default {
  title: 'Design Systems/Front/Input/Checkbox',
};

export const Default = () => <Checkbox />;

export const WithText = () => <Checkbox Text={<Label text="Label" />} />;
