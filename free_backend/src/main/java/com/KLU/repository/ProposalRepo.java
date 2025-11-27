package com.KLU.repository;

import com.KLU.model.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProposalRepo extends JpaRepository<Proposal, Long> {
    List<Proposal> findByJobId(Long jobId);
    List<Proposal> findByFreelancerId(Long freelancerId);
}
