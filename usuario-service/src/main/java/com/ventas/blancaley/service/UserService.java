package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.User;

import java.util.List;

public interface UserService {

    User registration(User user);
    List<User> getUsers();
    User getUserById(Long id);
    User updateUser(User user);
    void deleteById(Long id);
}