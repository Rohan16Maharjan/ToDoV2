import { Box, Button, Flex } from '@chakra-ui/react';
import { FaEdit, FaEye, FaRegStar, FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const AllTask = ({
  todoData,
  title,
  status,
  description,
  handleDelete,
  handleEdit,
  handleTask,
  handleFav,
}) => {
  return (
    <>
      <ul>
        {todoData?.data.map((item) => (
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
              <button
                style={{ border: 'none', marginRight: '1rem' }}
                type="button"
                onClick={() => handleEdit(item)}
              >
                <FaEdit style={{ cursor: 'pointer' }} />
              </button>

              <MdDelete
                onClick={() => handleDelete(item?.id)}
                style={{ cursor: 'pointer' }}
              />

              <Button mt={4} onClick={() => handleTask(item)}>
                <FaEye style={{ cursor: 'pointer' }} />
              </Button>

              <Button
                onClick={() => handleFav(item?.id)}
                leftIcon={
                  item?.favorite ? <FaStar color="gold" /> : <FaRegStar />
                }
              >
                {item.favorite}
              </Button>
            </Flex>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllTask;
