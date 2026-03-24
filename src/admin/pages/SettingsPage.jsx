import { Save } from "lucide-react";
import { AdminButton, AdminCard, AdminInput, SectionTitle } from "@/admin/components/AdminPrimitives";
import { Switch } from "@/components/ui/switch";
export default function SettingsPage() {
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Preferences" title="Settings" description="Store identity, alerts, and operational preferences with smooth input interactions."/>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminCard className="p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">Store Name</label>
              <AdminInput defaultValue="Tech Haven Store"/>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Support Email</label>
              <AdminInput defaultValue="support@techhaven.store"/>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Contact Number</label>
              <AdminInput defaultValue="+92 300 1234567"/>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">Warehouse Address</label>
              <AdminInput defaultValue="Johar Town, Lahore, Pakistan"/>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="space-y-5 p-6">
          {[
            "Enable order alerts",
            "Auto approve verified reviews",
            "Marketing email summaries",
            "Show low stock warnings",
        ].map((item, index) => (<div key={item} className="flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3">
              <div>
                <p className="font-medium">{item}</p>
                <p className="text-sm text-muted-foreground">Operational dashboard preference #{index + 1}</p>
              </div>
              <Switch defaultChecked={index !== 2}/>
            </div>))}

          <AdminButton className="w-full rounded-2xl gradient-primary text-primary-foreground">
            <Save size={18}/>
            Save Settings
          </AdminButton>
        </AdminCard>
      </div>
    </div>);
}
