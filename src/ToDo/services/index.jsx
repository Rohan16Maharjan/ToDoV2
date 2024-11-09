import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { httpClient } from './axios';
import { toast } from 'react-toastify';

// get all
const getAllTodo = () => {
  return httpClient.get(api.getAll);
};

const useGetAllTodo = () => {
  return useQuery({
    queryKey: [api.getAll],
    queryFn: getAllTodo,
  });
};

// deleteAll
const deleteAllTodo = () => {
  return httpClient.delete(api.deleteAll);
};

const useDeleteAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.warning('Task deleted successfully!!');
    },
  });
};

// create
const createTodo = (data) => {
  return httpClient.post(api.create, data);
};

const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.success('Task added successfully!!');
    },
  });
};

// delete by id
const deleteTodo = (id) => {
  return httpClient.delete(api.delete.replace('{id}', `${id}`));
};

const useDeleteToDo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.warning('Task deleted successfully!!');
    },
  });
};

// update
const updateTodo = ({ reqBody }) => {
  return httpClient.put(api.update, reqBody);
};

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.success('Task edited successfully!!');
    },
  });
};

// favourtie
const favourite = (id) => {
  return httpClient.post(api.favourite.replace('{id}', `${id}`));
};

const useFavourite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: favourite,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getfavourite]);
    },
  });
};

// getAllFavourite
const getFavourite = () => {
  return httpClient.get(api.getfavourite);
};

const useGetFavourite = () => {
  return useQuery({
    queryKey: [api.getfavourite],
    queryFn: getFavourite,
  });
};

export {
  useDeleteAll,
  useGetAllTodo,
  useCreate,
  useDeleteToDo,
  useUpdateTodo,
  useFavourite,
  useGetFavourite,
};
