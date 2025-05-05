package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUsers")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

//    @GetMapping("/getUsers")
//    public String getUsers() {
//        return "ABCD";
//    }

    @PostMapping("/adduser")
    public User saveUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO.name);
        return userService.saveUser(userDTO);
    }

    @PutMapping("/updateuser")
    public User updateUser(@RequestBody UserDTO userDTO){
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("deleteuser/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId){
        return userService.deleteUser(userId);
    }

}


