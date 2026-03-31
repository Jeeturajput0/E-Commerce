import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";
import { AdminButton, AdminCard, AdminInput, SectionTitle, StatusBadge } from "@/features/admin/components/AdminPrimitives";
import { useAdminDashboard } from "@/features/admin/context/AdminDashboardContext";
export default function MessagesPage() {
    const { messages, selectThread, selectedThreadId, sendMessage } = useAdminDashboard();
    const [draft, setDraft] = useState("");
    const activeThread = useMemo(() => messages.find((thread) => thread.id === selectedThreadId) ?? messages[0], [messages, selectedThreadId]);
    return (<div className="space-y-8">
      <SectionTitle eyebrow="Inbox" title="Messages" description="A chat-style support panel with live-feel bubbles and a lightweight reply composer."/>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <AdminCard className="p-3">
          <div className="space-y-2">
            {messages.map((thread) => {
            const lastMessage = thread.messages[thread.messages.length - 1];
            return (<button key={thread.id} type="button" onClick={() => selectThread(thread.id)} className={`w-full rounded-2xl p-4 text-left transition-all ${thread.id === selectedThreadId ? "bg-primary/10" : "hover:bg-secondary/70"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-yellow-300 font-semibold text-primary-foreground">
                        {thread.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{thread.customer}</p>
                        <p className="text-sm text-muted-foreground">{lastMessage?.text}</p>
                      </div>
                    </div>
                    <StatusBadge tone={thread.status === "Online" ? "success" : "warning"}>{thread.status}</StatusBadge>
                  </div>
                </button>);
        })}
          </div>
        </AdminCard>

        <AdminCard className="flex min-h-[560px] flex-col p-0">
          <div className="border-b border-border/60 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-yellow-300 font-semibold text-primary-foreground">
                {activeThread?.avatar}
              </div>
              <div>
                <p className="font-semibold">{activeThread?.customer}</p>
                <p className="text-sm text-muted-foreground">Customer support conversation</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            {activeThread?.messages.map((message, index) => (<motion.div key={`${message.id}-${index}`} initial={{ opacity: 0, x: message.sender === "admin" ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 ${message.sender === "admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  <p>{message.text}</p>
                  <p className={`mt-2 text-xs ${message.sender === "admin" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{message.time}</p>
                </div>
              </motion.div>))}
          </div>

          <div className="border-t border-border/60 px-6 py-5">
            <div className="flex gap-3">
              <AdminInput value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a reply..."/>
              <AdminButton onClick={() => {
            sendMessage(draft);
            setDraft("");
        }} className="rounded-2xl gradient-primary text-primary-foreground">
                <SendHorizonal size={18}/>
              </AdminButton>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>);
}

