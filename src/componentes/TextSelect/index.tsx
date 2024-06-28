import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import React from "react"
import './styles.scss'
import { IconFlag } from "../IconFlag"
type TextInputProp = {
    options:{name:string, img?:string, value:string|number}[]|[]
    value?:string|number|undefined
    text:string
    defaultValue?:{name:string, img?:string, value:string|number}
    onChange?:(event: SelectChangeEvent<any>) => void
}
export const TextSelect = ({options, value, text, defaultValue, onChange}:TextInputProp)=>{
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
    return (
      <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel>{text}</InputLabel>
          <Select
          size="small"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          input={<OutlinedInput label={text} />}
          label="Age"
          onChange={onChange}
          className="styles-select"
          >
          { defaultValue&&<MenuItem key={defaultValue.value} value={defaultValue.value} >
               {defaultValue.img&&<IconFlag src={defaultValue.img}/>}
              <ListItemText primary={defaultValue.name} />
            </MenuItem>}
            {options.map((data) => (
              <MenuItem key={data.name} value={data.value} >
                {data.img&&<IconFlag src={data.img}/>}
                <ListItemText primary={data.name} />
              </MenuItem>
            ))}
          </Select>
      </FormControl>
    )

}
