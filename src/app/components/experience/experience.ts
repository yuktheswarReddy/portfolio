import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Experience {
  company: string;
  companyUrl: string;
  technologies: string[];
  repository?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {
  readonly companyKeys = ['ACCENTURE_GOOGLE', 'ACCENTURE_BOA', 'ACCENTURE_VERIZON'];
  readonly experiences: Experience[] = [
    {
      company: 'Accenture - Google',
      companyUrl: 'https://www.accenture.com',      
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'Java', 'HTML5', 'CSS', 'SCSS', 'gRPC', 'BIgQuery','Apps Framework', 'Cider', 'Microservices'],
    },
    {
      company: 'Accenture - Bank of America',
      companyUrl: 'https://www.accenture.com',      
      technologies: ['Angular', 'Java', 'JavaScript', 'TypeScript', 'Spring Boot','Microservices', 'HTML5', 'CSS', 'SCSS', 'GitHub', 'REST API', 'Design Patterns', 'AWS', 'MySQL', 'Spring Security', 'JWT', 'Spring Data JPA', 'Spring Profiles', 'RxJS', 'Angular Signals', 'NgRx', 'Jasmine', 'Karma'],
    },
    {
      company: 'Accenture - Verizon',
      companyUrl: 'https://www.accenture.com',      
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'SCSS', 'GitHub', 'Node.js','MEAN Stack'],
    },
  ];

  readonly translatedAchievements = signal<Record<string, string[]>>({});

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadAchievements();
    this.translateService.onLangChange.subscribe(() => this.loadAchievements());
  }

  private loadAchievements(): void {
    const achievements: Record<string, string[]> = {};
    this.companyKeys.forEach(key => {
      const achievementsKey = `EXPERIENCE.COMPANIES.${key}.ACHIEVEMENTS`;
      const translated = this.translateService.instant(achievementsKey);
      achievements[key] = Array.isArray(translated) ? translated : [];
    });
    this.translatedAchievements.set(achievements);
  }

  getAchievements(companyKey: string): string[] {
    return this.translatedAchievements()[companyKey] || [];
  }

  trackByCompany(_: number, exp: Experience): string {
    return exp.company;
  }

  trackByAchievement(_: number, achievement: string): string {
    return achievement;
  }

  trackByTech(_: number, tech: string): string {
    return tech;
  }
}
