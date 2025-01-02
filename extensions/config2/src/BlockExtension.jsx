import {
  reactExtension,
  useApi,
  AdminBlock,
  BlockStack,
  Text,
  Button
} from '@shopify/ui-extensions-react/admin';
import {  TextField  } from '@shopify/ui-extensions/admin';

const TARGET = 'admin.product-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  const {data} = useApi(TARGET);
  console.log({data});

  return (
    <AdminBlock title="My Block Extension">
      <BlockStack>
        <Text fontWeight="bold"> Hello </Text>
        <Button> Add</Button>
      </BlockStack>
      <AdminBlock title="My App Block">
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </AdminBlock>
    </AdminBlock>
  );
}