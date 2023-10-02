package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Employee;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.EmployeeRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/app/v1/employee")
public class EmployeeController {
	
	@Autowired
	EmployeeRepository employeeRepo;
	
	@GetMapping
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
	}
	
	@PostMapping
	public Employee addEmployee(@RequestBody Employee emp) {
		return employeeRepo.save(emp);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
		Employee emp = employeeRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not exist with "+ id));
		return ResponseEntity.ok(emp);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable long id , @RequestBody Employee employeeDetails){
		Employee updateEmp = employeeRepo.findById(id).orElseThrow(() -> new  ResourceNotFoundException("Employee not exist with "+ id));
		updateEmp.setFirstName(employeeDetails.getFirstName());
		updateEmp.setLastName(employeeDetails.getLastName());
		updateEmp.setEmailId(employeeDetails.getEmailId());
		
		employeeRepo.save(updateEmp);
		return ResponseEntity.ok(updateEmp);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id) {
		Employee emp = employeeRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with " + id));
		employeeRepo.delete(emp);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
}
