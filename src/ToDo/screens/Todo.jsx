import {
  Box,
  CircularProgress,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { TodoSlug } from '../../constant/TodoSlug';
import CustomModal from '../../utils/Modal';
import {
  useCreate,
  useDeleteAll,
  useDeleteToDo,
  useFavourite,
  useGetAllTodo,
  useGetComplete,
  useGetFavourite,
  useGetPending,
  useGetProgress,
  useUpdateTodo,
} from '../services';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AllTask from '../components/AllTask';
import FavouiteTask from '../components/FavouiteTask';
import PendingTask from '../components/PendingTask';
import ProgressTask from '../components/ProgressTask';
import CompleteTask from '../components/CompleteTask';

const Todo = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: todoData, isLoading } = useGetAllTodo();
  const { mutate: del } = useDeleteAll();
  const { mutate: add } = useCreate();
  const { mutate: del1 } = useDeleteToDo();
  const { mutate: upda } = useUpdateTodo();
  const { mutate: fav } = useFavourite();
  const { data: favData } = useGetFavourite();
  const { data: comData } = useGetComplete();
  const { data: penData } = useGetPending();
  const { data: proData } = useGetProgress();

  // update
  const [taskId, setTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // state for select
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    if (taskId) {
      const taskToEdit = todoData?.data.find((item) => item.id === taskId);
      if (taskToEdit) {
        setValue('title', taskToEdit.title);
        setValue('description', taskToEdit.description);
        setSelectedData({ value: taskToEdit.status, label: taskToEdit.status });
      } else {
        reset();
        setSelectedData(null);
      }
    } else {
      reset();
    }
  }, [taskId, todoData, setValue, reset]);

  const onSubmit = (eg) => {
    console.log('herrr', selectedData);
    const payload = {
      ...eg,
      status: selectedData?.value,
    };
    if (taskId) {
      upda({
        reqBody: {
          id: taskId,
          title: eg.title,
          status: selectedData?.value,
          description: eg.description,
        },
      });
    } else {
      add(payload);
    }
    setTaskId(null);
    setSelectedData(null);
    reset();
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete All?')) {
      try {
        await del();
      } catch (err) {
        console.error('Error deleting the data', err);
      }
    }
  };

  const handleDelete = (id) => {
    del1(id);
  };

  const handleEdit = (data) => {
    setTaskId(data?.id);
  };

  const handleTask = (data) => {
    setSelectedTask(data);
    onOpen();
  };

  const handleFav = (id) => {
    fav(id);
  };

  if (isLoading) {
    return <CircularProgress isIndeterminate color="green.300" />;
  }

  return (
    <Box m={'0 auto'} maxW={'50%'} pt={'2rem'}>
      <Heading textAlign={'center'}>TodoList</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input
          {...register('title', { required: 'Title cannot be null' })}
          style={{
            width: '100%',
            border: '1px solid black',
            padding: '1rem 5rem',
            margin: '10px ',
          }}
        />
        {errors.title && (
          <span
            style={{
              fontSize: '0.875rem',
              display: 'block',
              textAlign: 'center',
              marginTop: '0.25rem',
              color: 'red',
            }}
          >
            Title Cannot be null
          </span>
        )}
        <label>Description</label>
        <input
          {...register('description', {
            required: 'Description cannot be null',
          })}
          style={{
            width: '100%',
            border: '1px solid black',
            padding: '1rem 5rem',
            margin: '10px',
          }}
        />
        {errors.description && (
          <span
            style={{
              fontSize: '0.875rem',
              display: 'block',
              textAlign: 'center',
              marginTop: '0.25rem',
              color: 'red',
            }}
          >
            Description Cannot be null
          </span>
        )}

        <Box m={5}>
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <Select
                {...field}
                options={TodoSlug}
                onChange={(selectedOption) => {
                  setSelectedData(selectedOption);
                  field.onChange(selectedOption);
                }}
                value={selectedData}
              />
            )}
          />
          {errors.status && (
            <span
              style={{
                fontSize: '0.875rem',
                display: 'block',
                textAlign: 'center',
                marginTop: '0.25rem',
                color: 'red',
              }}
            >
              {errors.status.message}
            </span>
          )}
        </Box>

        <Flex justifyContent={'space-around'}>
          <button
            style={{
              width: '15%',
              border: '1px solid red',
              padding: '1rem',
              marginRight: '1rem',
            }}
            type="submit"
          >
            {taskId ? 'Edit' : 'Add'}
          </button>
          <button
            style={{ border: '1px solid red', padding: '1rem' }}
            onClick={() => handleDeleteAll()}
          >
            Clear All
          </button>
        </Flex>
      </form>

      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Pending</Tab>
          <Tab>Complete</Tab>
          <Tab>Progress</Tab>
          <Tab>Favourite</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllTask
              todoData={todoData}
              title={'Title'}
              status={'Status'}
              description={'Description'}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleTask={handleTask}
              handleFav={handleFav}
            />
          </TabPanel>
          <TabPanel>
            <PendingTask
              penData={penData}
              title={'Title'}
              status={'Status'}
              description={'Description'}
              handleFav={handleFav}
            />
          </TabPanel>
          <TabPanel>
            <CompleteTask
              comData={comData}
              title={'Title'}
              status={'Status'}
              description={'Description'}
              handleFav={handleFav}
            />
          </TabPanel>
          <TabPanel>
            <ProgressTask
              proData={proData}
              title={'Title'}
              status={'Status'}
              description={'Description'}
              handleFav={handleFav}
            />
          </TabPanel>
          <TabPanel>
            <FavouiteTask
              favData={favData}
              title={'Title'}
              status={'Status'}
              description={'Description'}
              handleFav={handleFav}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <CustomModal
        heading={`View Task`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        selectedTask={selectedTask}
      >
        {selectedTask ? (
          <div>
            <h2>Title: {selectedTask?.title}</h2>
          </div>
        ) : (
          <p>No task selected.</p>
        )}
      </CustomModal>
    </Box>
  );
};

export default Todo;
