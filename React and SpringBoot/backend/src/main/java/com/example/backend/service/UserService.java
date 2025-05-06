package com.example.backend.service;

import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepo userRepo;
//    private final ModelMapper modelMapper;

    public UserService(UserRepo userRepo, ModelMapper modelMapper) {
        this.userRepo = userRepo;
//        this.modelMapper = modelMapper;
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
//        return modelMapper.map(userList, new TypeToken<List<UserDTO>>() {}.getType());
    }

    public User saveUser(UserDTO userDTO) {
//        User user = modelMapper.map(userDTO, User.class);
        User user = new User();
        user.setName(userDTO.name);
        System.out.println(user.getName());
        return userRepo.save(user);
//        return userDTO;
    }

    public User updateUser(UserDTO userDTO){
        User user = new User();
        user.setName(userDTO.name);
        user.setId(userDTO.id);
        System.out.println(user.getName());
        return userRepo.save(user);
    }

    public String deleteUser(Integer userId){
        System.out.println(userId);
        userRepo.deleteById(userId);
        return "User Deleted";
    }

//    public User deleteUser(Integer userId){
//        User user = new User();
//        user.getId();
//        return userRepo.deleteById(userId);
//    }

}
