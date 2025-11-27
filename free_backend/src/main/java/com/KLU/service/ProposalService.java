package com.KLU.service;

import com.KLU.model.Proposal;
import com.KLU.repository.ProposalRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProposalService {
    private final ProposalRepo proposalRepo;
    public ProposalService(ProposalRepo proposalRepo) {
        this.proposalRepo = proposalRepo;
    }

    public Proposal submitProposal(Proposal proposal) {
        return proposalRepo.save(proposal);
    }

    public List<Proposal> getProposalsByJobId(Long jobId) {
        return proposalRepo.findByJobId(jobId);
    }

    public List<Proposal> getProposalsByFreelancerId(Long freelancerId) {
        return proposalRepo.findByFreelancerId(freelancerId);
    }
}
