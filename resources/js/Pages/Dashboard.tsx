import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/Components/ui/dialog"
import {Button } from "@/Components/ui/button"
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import Admin from './Roles/Admin';
// import { ComplaintsTable } from '@/Pages/Complaints';
import DashboardStats from '@/Components/StatsCard';
import  User  from './Roles/User';




export default function Dashboard() {   
    


    const user = usePage().props.auth.user;
    
        const [showingNavigationDropdown, setShowingNavigationDropdown] =
            useState(false);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
            >
            {/* <Head title="Dashboard" /> */}
           

            {/* Render content based on roles */}
          

            <Admin>
            </Admin>
            {/* <User></User> */}
            {/* {{ @can('edit articles')
                 You can EDIT ARTICLES.
                @endcan }} */}
            {/* <ComplaintsTable complaints={} totalComplaints={} totalResolved={} totalPending={} totalAssets={}></ComplaintsTable> */}
     
         
        </AuthenticatedLayout>
    );
}
