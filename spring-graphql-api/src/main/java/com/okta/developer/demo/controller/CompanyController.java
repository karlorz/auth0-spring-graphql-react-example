package com.okta.developer.demo.controller;

import com.okta.developer.demo.domain.Company;
import com.okta.developer.demo.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @QueryMapping
    public Flux<Company> companyList(@Argument Long page) {
        return companyRepository.findAll().skip(page * 10).take(10);
    }

    @QueryMapping
    public Mono<Long> companyCount() {
        return companyRepository.count();
    }

    @MutationMapping
    public Mono<Company> createCompany(@Argument("input") Company input) {
        return companyRepository.save(input);
    }

    @MutationMapping
    public Mono<Company> updateCompany(@Argument("id") Long id, @Argument("input") Company input) {
        return companyRepository.findById(id)
                .flatMap(existingCompany -> {
                    existingCompany.setSIC(input.getSIC());
                    existingCompany.setCategory(input.getCategory());
                    existingCompany.setCompanyNumber(input.getCompanyNumber());
                    existingCompany.setCountryOfOrigin(input.getCountryOfOrigin());
                    existingCompany.setIncorporationDate(input.getIncorporationDate());
                    existingCompany.setMortgagesOutstanding(input.getMortgagesOutstanding());
                    existingCompany.setName(input.getName());
                    existingCompany.setStatus(input.getStatus());
                    return companyRepository.save(existingCompany);
                });
    }

    @MutationMapping
    public Mono<Boolean> deleteCompany(@Argument("id") Long id) {
        return companyRepository.findById(id)
                .flatMap(existingCompany -> companyRepository.delete(existingCompany).then(Mono.just(true)))
                .defaultIfEmpty(false);
    }
}
