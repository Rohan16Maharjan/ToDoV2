import { Box, Button, Flex } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const FavouiteTask = ({ favData, title, status, description, handleFav }) => {
  return (
    <>
      <ul>
        {favData?.data?.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              border: '1px solid black',
              padding: '0.5rem',
            }}
          >
            <Flex flexDirection={'column'}>
              <Flex flexDirection={'column'}>
                <label>{title}</label>
                {item?.title}
              </Flex>
              <Box>
                <Flex flexDirection={'column'}>
                  <label>{status}</label>
                  {item?.status}
                </Flex>
              </Box>
              <Box>
                <Flex flexDirection={'column'}>
                  <label>{description}</label>
                  {item?.description}
                </Flex>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              <Button
                onClick={() => handleFav(item?.id)}
                leftIcon={
                  item?.favorite ? <FaStar color="gold" /> : <FaRegStar />
                }
              ></Button>
            </Flex>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FavouiteTask;
