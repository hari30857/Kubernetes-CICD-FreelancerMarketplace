package com.KLU.controller;

import com.KLU.model.Proposal;
import com.KLU.service.ProposalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proposals")
@CrossOrigin(origins = "http://localhost:5173")
public class ProposalController {
    private final ProposalService proposalService;
    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @PostMapping
    public Proposal submit(@RequestBody Proposal proposal) {
        return proposalService.submitProposal(proposal);
    }

    @GetMapping("/job/{jobId}")
    public List<Proposal> byJob(@PathVariable Long jobId) {
        return proposalService.getProposalsByJobId(jobId);
    }

    @GetMapping("/freelancer/{freelancerId}")
    public List<Proposal> byFreelancer(@PathVariable Long freelancerId) {
        return proposalService.getProposalsByFreelancerId(freelancerId);
    }
}
