import { GridSize, Grid } from '@mui/material';

export interface IVisualFormItem {
  xs?: GridSize;
  md?: GridSize;
  sm?: GridSize;
}

export interface IFormItem extends IVisualFormItem {
  label: string;
  error?: any;
  name: string;
  validations?: any;
  // name: string;
  // children?: any;
  // classes?: any;
  // register?: any;
  // errors?: any;
  // control?: any;
  // defaultValue?: any;
  // key?: string;
  // type?: any;
  // props?: any;
  // setValue?: any;
  // validations?: any;
  // inputRef?: any;
  // errorMessage?: string;
}

// export function FormItem({
//   type,
//   props,
//   register,
//   errors,
//   control,
//   name,
//   defaultValue,
//   key,
//   xs,
//   md,
//   sm,
//   validations,
//   setValue,
// }: IFormItem) {

//   const tratedName = name.split('.')[1] || name;

//   const [errorMessage, setErrorMessage] = useState<string>(
//     !!errors && errors[tratedName],
//   );

//   useEffect(() => {
//     if (errors) setErrorMessage(errors[tratedName]?.message);
//   }, [errors, tratedName]);

//   return (
//     <Grid
//       item
//       xs={xs || 12}
//       md={md || 12}
//       sm={sm || 12}
//     >
//       {createElement(type, {
//         ...{
//           ...props,
//           control: control,
//           inputRef:
//             type === InputAutocomplete || type === InputListItemDocuments
//               ? register(name, validations)
//               : validations
//                 ? register(validations)
//                 : register(name),
//           errors: errors,
//           errorMessage: errorMessage,
//           name: name,
//           key: key || name,
//           ...(setValue && {
//             setValue: (name: string, data: any | any[]) => {
//               setValue(name, data);
//             },
//           }),
//           ...(defaultValue && { defaultValue }),
//         },
//       })}
//     </Grid>
//   );
// }
