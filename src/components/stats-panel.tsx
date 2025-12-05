import React from 'react'
import { Badge } from './ui/badge'
import { Zap, BarChart3, Clock } from 'lucide-react'

export function StatsPanel() {
  return (
    <div className="bg-gradient-to-b from-[#02563d] to-[#034d35] p-12 flex flex-col gap-12 h-full overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-5">
        <Badge>
          <Zap className="w-3 h-3" />
          Powered by Advanced AI
        </Badge>
        
        <h2 className="text-4xl font-normal text-white leading-10 tracking-wide">
          Your Candidates Are Waiting
        </h2>
        
        <p className="text-lg text-white/90 leading-7">
          Sign in to review completed interviews, schedule new ones, and make faster hiring decisions with AI-powered insights.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col gap-4">
        {/* Main Interview Card */}
        <div className="bg-white/10 border border-white/20 rounded-[10px] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-[10px]">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-normal text-white leading-8">153</div>
              <div className="text-sm text-white/80 leading-5">Interviews Today</div>
            </div>
          </div>
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-white" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-white" />
              <span className="text-sm text-white/80">Avg Score</span>
            </div>
            <div className="text-2xl font-normal text-white leading-8">84.2</div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-[10px] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-sm text-white/80">Avg Duration</span>
            </div>
            <div className="text-2xl font-normal text-white leading-8">32m</div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-white/10 border border-white/20 rounded-[10px] p-6 flex flex-col gap-4">
        <div className="text-4xl text-white leading-10">&ldquo;</div>
        <p className="text-lg text-white leading-7">
          InterviewAI reduced our time-to-hire by 60% and helped us scale our engineering team from 20 to 100 people in 6 months.
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
            <span className="text-sm text-white">SM</span>
          </div>
          <div className="flex flex-col">
            <div className="text-base text-white leading-6">Sarah Mitchell</div>
            <div className="text-sm text-white/80 leading-5">Head of Talent, TechCorp</div>
          </div>
        </div>
      </div>
    </div>
  )
}


