import React from 'react';
import {
  Pane,
  Text,
} from 'evergreen-ui';

const ThumbnailPlaceholder = () => 
  <Pane
    width={128}
    minHeight={180}
    background="tint2"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Text>No thumbnail</Text>
  </Pane>

export default ThumbnailPlaceholder;
