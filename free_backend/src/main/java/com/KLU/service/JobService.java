package com.KLU.service;

import com.KLU.model.Job;
import com.KLU.repository.JobRepo;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class JobService {
    private static final Logger logger = LoggerFactory.getLogger(JobService.class);
    private final JobRepo jobRepo;

    public JobService(JobRepo jobRepo) {
        this.jobRepo = jobRepo;
    }

    // Post Job
    public Job postJob(Job job) {
        logger.info("Posting job: " + job.getTitle());
        return jobRepo.save(job);
    }

    // Get All Jobs
    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }
}
