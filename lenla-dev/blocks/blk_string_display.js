import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';

  const StringDisplayBlock = ({ data }) => {
    return (
      <BaseBlockWithoutHeader data={data} inputId={"number_in"} bgColor={'#9b92fc'} isImgLabel={true} showInLabel={false} imgPath={'/../public/ic_console.png'} blk_height={70} blk_width={70}/>
    );
  };

export default StringDisplayBlock