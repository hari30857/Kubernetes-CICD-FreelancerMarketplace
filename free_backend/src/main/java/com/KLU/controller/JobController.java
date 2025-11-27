package com.KLU.controller;

import com.KLU.model.Job;
import com.KLU.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Adjust port if needed
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService service;

    // Create Job
    @PostMapping("/addjob")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        Job createdJob = service.postJob(job);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED); // Returning 201 status
    }

    // Get All Jobs
    @GetMapping("viewjobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = service.getAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }
}
