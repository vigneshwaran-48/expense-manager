"use client";

import { NavLink } from '@/app/components/NavLink';
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><NavLink href="/expenses">Expenses</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar;