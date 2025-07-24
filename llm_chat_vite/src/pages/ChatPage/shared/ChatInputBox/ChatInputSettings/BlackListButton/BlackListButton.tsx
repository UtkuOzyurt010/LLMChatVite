import { Box, Button, useTheme } from '@mui/material';
import { BookX } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

export const BlackListButton = ({text, setText} : {text : string, setText : Dispatch<SetStateAction<string>>}) => {
  const theme = useTheme();
  const buttonHeight = theme.customSizes.buttonHeight;
  const buttonHeightn = theme.customSizes.buttonHeightn;

  const blacklist :string[] = ["thank you", "please", "can you", "could you", "if you could"]

  const applyBlacklist = (text: string): string => {
    return blacklist.reduce((result, phrase) => {
      const regex = new RegExp(phrase, "gi"); // 'gi' for global and case-insensitive match
      return result.replace(regex, "");
    }, text).trim();
  };

  const handleClick = () => {
    setText(applyBlacklist(text));
  }
  return (
    <Box position="relative" width={buttonHeight} height={buttonHeight}>
      <Button
        sx={{
          padding: 0,
          minWidth: 0,
          margin: 0,
          height: buttonHeight,
          width: buttonHeight,
          position: 'relative',
        }}
        disableRipple
        disableElevation
        onClick={handleClick}
      >
        <Box
          sx={{
            width: buttonHeight,
            height: buttonHeight,
            backgroundColor: 'green',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* lucide icons dont accept sx like MUI does, so this needs a wrapper container */}
          <BookX color="white" size={buttonHeightn * 0.7} />
        </Box>
      </Button>
    </Box>
  );
};
