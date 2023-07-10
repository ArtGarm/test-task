import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

interface Props {
  children: JSX.Element | string | number
  copyText: string | number
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
  // eslint-disable-next-line react/jsx-props-no-spreading
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

function CopyToClipboard({ children, copyText }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Typography
        onClick={() => {
          navigator.clipboard.writeText(`${copyText}`);
          setOpen(true);
        }}
      >
        {children}
      </Typography>
      <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Copied to the clipboard
        </Alert>
      </Snackbar>
    </>
  );
}

export default CopyToClipboard;
