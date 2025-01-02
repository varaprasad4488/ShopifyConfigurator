import {
  reactExtension,
  useApi,
  AdminAction,
  BlockStack,
  Button,
  Checkbox,
  InlineStack,
  Text,
  TextField,
  Image,
} from '@shopify/ui-extensions-react/admin';
import { useState } from 'react';

const TARGET = 'admin.product-details.action.render';

export default reactExtension(TARGET, () => <ConfigPanel />);

function ConfigPanel() {
  const { close } = useApi(TARGET);
  const [options, setOptions] = useState([]);
  const predefinedOptionNames = ['501', '502', '503', '505', '506', '507', '508'];
  const predefinedAnimationNames = [
    'Transition_button_style',
    'Transition_pockets_style',
    'Transition_elbow_patches',
    'Transition_back_vent_style',
  ];

  const predefinedPartNames = [
    'Double_Breasted_Patch_Pocket',
    'Single_AndDouble_Breasted_v2',
    'Single_AndDouble_Breasted_v2_Stetches13',
    'polySurface9Single_Breasted_Back_Outside',
  ];
  const [showMaterials, setShowMaterials] = useState(null);
  const [showAnimations, setShowAnimations] = useState(null);
  const [showParts, setShowParts] = useState(null);


  const handleAddOption = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      {
        id: Date.now(),
        optionName: '',
        material: [],
        animation: [],
        image: null,
        types: [],
        isVisible: true,
      },
    ]);
  };

  const handleUpdateOption = (optionId, field, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? { ...option, [field]: value }
          : option
      )
    );
  };

  const handleUpdateType = (optionId, typeId, field, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? {
            ...option,
            types: option.types.map((type) =>
              type.id === typeId ? { ...type, [field]: value } : type
            ),
          }
          : option
      )
    );
  };

  const handleRemoveOption = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== optionId)
    );
  };

  const handleAddType = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? {
            ...option,
            types: [
              ...option.types,
              {
                id: Date.now(),
                label: '',
                price: '',
                parts: [],
                condition: false,
              },
            ],
          }
          : option
      )
    );
  };

  const handleRemoveType = (optionId, typeId) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? {
            ...option,
            types: option.types.filter((type) => type.id !== typeId),
          }
          : option
      )
    );
  };

  const toggleVisibility = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? { ...option, isVisible: !option.isVisible }
          : option
      )
    );
  };

  console.log(options);

  const getSubmit = async () => {
    const data = options?.[0];  
    const jsonOutput = JSON.stringify(data, null, 2); 
    
    
    const namespace = 'custom';
    const key = 'information';
    const value = jsonOutput;
    const type = 'json';

    const requestData = {
      namespace,
      key,
      value,
      type
    };
  
  
    try {
      const response = await fetch('https://shopify-backend-1.onrender.com/api/8811784143087/config', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(requestData),  
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
      } else {
        const responseData = await response.json();
        console.log('Success:', responseData);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
  };
  



  return (
    <AdminAction
      primaryAction={
        <Button
          onPress={() => {
            getSubmit()
            close();
          }}
        >
          Save
        </Button>
      }
      secondaryAction={
        <Button
          onPress={() => {
            console.log('Closing without saving');
            close();
          }}
        >
          Close
        </Button>
      }
    >
      <BlockStack spacing="loose">
        <Button onPress={handleAddOption}>Add New Option</Button>
        {options.map((option) => (
          <BlockStack key={option.id} spacing="base">
            <TextField
              label="Option Name"
              value={option.optionName}
              onChange={(value) =>
                handleUpdateOption(option.id, 'optionName', value)
              }
            />

            <BlockStack spacing="tight">
              <TextField
                label="Materials"
                value={option.material.join(', ')}
                placeholder="Click to select materials"
                onFocus={() => setShowMaterials(option.id)}
                onChange={() => { }}
                readOnly
              />
              {showMaterials === option.id && (
                <BlockStack spacing="tight">
                  {predefinedOptionNames.map((name) => (
                    <InlineStack key={name} spacing="tight" alignment="center">
                      <Checkbox
                        checked={option.material.includes(name)}
                        onChange={(checked) => {
                          const updatedMaterials = checked
                            ? [...option.material, name]
                            : option.material.filter((mat) => mat !== name);
                          handleUpdateOption(option.id, 'material', updatedMaterials);
                        }}
                      />
                      <Text>{name}</Text>
                    </InlineStack>
                  ))}
                  <Button onPress={() => setShowMaterials(null)}>Update</Button>
                </BlockStack>
              )}
            </BlockStack>

            <BlockStack spacing="tight">
              <TextField
                label="Animations"
                value={option.animation.join(', ')}
                placeholder="Click to select animations"
                onFocus={() => setShowAnimations(option.id)}
                onChange={() => { }}
                readOnly
              />
              {showAnimations === option.id && (
                <BlockStack spacing="tight">
                  {predefinedAnimationNames.map((name) => (
                    <InlineStack key={name} spacing="tight" alignment="center">
                      <Checkbox
                        checked={option.animation.includes(name)}
                        onChange={(checked) => {
                          const updatedAnimations = checked
                            ? [...option.animation, name]
                            : option.animation.filter((anim) => anim !== name);
                          handleUpdateOption(option.id, 'animation', updatedAnimations);
                        }}
                      />
                      <Text>{name}</Text>
                    </InlineStack>
                  ))}
                  <Button onPress={() => setShowAnimations(null)}>Update</Button>
                </BlockStack>
              )}
            </BlockStack>

            <Image
              label="Upload Image"
              onFileChange={(file) =>
                handleUpdateOption(option.id, 'image', file)
              }
            />

            <BlockStack spacing="tight">
              <Button onPress={() => toggleVisibility(option.id)}>
                {option.isVisible ? 'Hide' : 'Show'}
              </Button>
              <Button onPress={() => handleAddType(option.id)}>
                Add Type
              </Button>
              <Button onPress={() => handleRemoveOption(option.id)}>
                Remove Option
              </Button>
            </BlockStack>

            {option.isVisible &&
              option.types.map((type) => (
                <BlockStack key={type.id} spacing="base" padding="loose">
                  <TextField
                    label="Label"
                    value={type.label}
                    onChange={(value) =>
                      handleUpdateOption(option.id, 'types', {
                        ...type,
                        label: value,
                      })
                    }
                  />
                  <TextField
                    label="Price"
                    value={type.price}
                    onChange={(value) =>
                      handleUpdateOption(option.id, 'types', {
                        ...type,
                        price: value,
                      })
                    }
                  />
                  {/* <BlockStack spacing="tight">
                    <TextField
                      label="Parts"
                      value={type.parts ? type.parts.join(', ') : ''}
                      placeholder="Click to select parts"
                      onFocus={() => setShowParts(type.id)}
                      onChange={() => { }} 
                      readOnly
                    />
                    {showParts === type.id && (
                      <BlockStack spacing="tight">
                        {predefinedPartNames.map((part) => (
                          <InlineStack key={part} spacing="tight" alignment="center">
                            <Checkbox
                             onChange={(checked) => {
                              const updatedParts = checked
                                ? [...(type.parts || []), part]
                                : (type.parts || []).filter((p) => p !== part);
                              handleUpdateOption(option.id, 'types', option.types.map(t => 
                                t.id === type.id ? { ...t, parts: updatedParts } : t
                              ));
                            }}
                            />
                            <Text>{part}</Text>
                          </InlineStack>
                        ))}
                        <Button onPress={() => setShowParts(null)}>Update</Button>
                      </BlockStack>
                    )}
                  </BlockStack> */}
                  <BlockStack spacing="tight">
                    <TextField
                      label="Parts"
                      value={option.parts ? option.parts.join(', ') : ''}
                      placeholder="Click to select parts"
                      onFocus={() => setShowParts(option.id)}
                      onChange={() => { }}
                      readOnly
                    />
                    {showParts === option.id && (
                      <BlockStack spacing="tight">
                        {predefinedPartNames.map((part) => (
                          <InlineStack key={part} spacing="tight" alignment="center">
                            <Checkbox
                              checked={option.types.some((t) => t.parts?.includes(part))}
                              onChange={(checked) => {
                                const updatedParts = checked
                                  ? [...(option.parts || []), part]
                                  : (option.parts || []).filter((p) => p !== part);
                                handleUpdateOption(option.id, 'parts', updatedParts);
                              }}
                            />
                            <Text>{part}</Text>
                          </InlineStack>
                        ))}
                        <Button onPress={() => setShowParts(null)}>Update</Button>
                      </BlockStack>
                    )}
                  </BlockStack>
                  <Button
                    onPress={() => handleRemoveType(option.id, type.id)}
                  >
                    Remove Type
                  </Button>
                </BlockStack>
              ))}
          </BlockStack>
        ))}
      </BlockStack>
    </AdminAction>
  );
}