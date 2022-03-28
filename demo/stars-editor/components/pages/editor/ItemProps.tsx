import { Form } from 'antd';
import { useModule } from '../../../../../lib';
import { EditorService } from '../../../services/editor.service';

export function ItemProps() {

  const { activeItem } = useModule(EditorService);

  return (
    <Form>
      <div></div>
    </Form>
  );

}
