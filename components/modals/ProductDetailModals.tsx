"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2, TriangleAlert } from "lucide-react";

import { singleArticleCompleteDBDetailsAction } from "@/actions/articles.actions";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { getSupplierProperty } from "@/lib/methods";
import type { ArticleDB } from "@/types/articles.type";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type FetchedArticle = (ArticleDB & { id: string }) | null;

interface ProductDetailsModalProps {
  partRef: string;
  partYear: number;
}

const ProductDetailsModal = ({
  partRef,
  partYear,
}: ProductDetailsModalProps) => {
  // Safe, stable key per ref/year
  const queryKey = useMemo(
    () => ["article-details", partRef, partYear],
    [partRef, partYear]
  );

  /**
   * NOTE: The ModalBody tree only mounts when the modal opens (for most modal libs),
   * so we can let the query run immediately. If your modal implementation keeps
   * the body mounted, you can gate with an "open" state and use `enabled: open`.
   */
  const { data, isFetching, isError, error, refetch } =
    useQuery<FetchedArticle>({
      queryKey,
      queryFn: async () => {
        // The server action already has try/catch and returns `null` on failure
        // but we also catch here to ensure we never throw to react-query users.
        try {
          const result = await singleArticleCompleteDBDetailsAction(
            partRef,
            String(partYear)
          );
          return result ?? null;
        } catch {
          return null;
        }
      },
      // Sensible defaults for modal detail lookups
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 10, // keep cached for 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    });

  const article = data;

  return (
    <Modal>
      <ModalTrigger className="group/modal-btn flex w-full justify-center">
        <span className="flex cursor-pointer items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
          <ExternalLink className="mr-2 size-4" />
          View Details
        </span>
      </ModalTrigger>

      <ModalBody className="overflow-auto">
        <ModalContent>
          <h4 className="mb-6 text-center text-lg font-bold text-neutral-700 md:text-2xl dark:text-neutral-100">
            Complete Details · {partRef} ({partYear || "—"})
          </h4>

          {/* Loading state */}
          {isFetching && (
            <div className="mb-4 flex items-center justify-center rounded-md border p-3">
              <Loader2 className="mr-2 size-4 animate-spin" />
              <span className="text-sm font-medium">Loading details…</span>
            </div>
          )}

          {/* Error or empty state */}
          {!isFetching && (isError || !article) && (
            <div className="mb-4 flex items-start gap-2 rounded-md border border-yellow-400/60 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-600/60 dark:bg-yellow-900/30 dark:text-yellow-200">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <div className="text-sm">
                <p className="font-medium">No details available</p>
                <p className="text-xs opacity-80">
                  We couldn&apos;t find complete details for{" "}
                  <strong>{partRef}</strong>
                  {partYear ? <> ({partYear})</> : null}.{" "}
                  <button
                    onClick={() => refetch()}
                    className="underline decoration-dotted underline-offset-2"
                  >
                    Try again
                  </button>
                  {isError && error ? (
                    <>
                      {" "}
                      <span className="opacity-70">
                        (error hidden for users)
                      </span>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          {article && (
            <div>
              <Card className="mx-auto w-full max-w-3xl overflow-auto">
                <CardHeader className="flex w-full justify-between">
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={"/stdp_logo.jpg"}
                        alt={"stdp-logo"}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                        priority
                      />
                      <div>
                        <CardTitle className="leading-tight">
                          {article.cod}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {article.libf || "Unnamed Article"} · #{article.cod}
                        </p>
                      </div>
                    </div>
                    <Image
                      src={
                        getSupplierProperty(
                          String(article.cod),
                          "supLogoURL"
                        ) || "/stdp_logo.jpg"
                      }
                      alt={"supplier-logo"}
                      width={100}
                      height={100}
                      className="rounded-md object-contain"
                    />
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="info">Info</TabsTrigger>
                      {/* Reserved for future tabs */}
                      <TabsTrigger value="oem" disabled>
                        OEM Numbers
                      </TabsTrigger>
                      <TabsTrigger value="compatible-cars" disabled>
                        Compatible Cars
                      </TabsTrigger>
                    </TabsList>

                    {/* Info Section */}
                    <TabsContent value="info" className="mt-4">
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Article ID:</strong>&nbsp;{article.cod}
                        </li>
                        <li>
                          <strong>Part Name:</strong>&nbsp;
                          {String(article.libf ?? "—")}
                        </li>
                        <li>
                          <strong>Year (iann):</strong>&nbsp;
                          {String(article.iann ?? "—")}
                        </li>
                        <li>
                          <strong>Supplier ID:</strong>&nbsp;
                          {article.codefour ?? "—"}
                        </li>
                        <li>
                          <strong>Supplier Name:</strong>&nbsp;
                          {article.codefour ?? "—"}
                        </li>
                        <li>
                          <strong>Website:</strong>&nbsp;
                          {(() => {
                            const website =
                              getSupplierProperty(
                                String(article.codefour),
                                "websiteURL"
                              ) || "";
                            return website ? (
                              <Link
                                href={website}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {website}
                              </Link>
                            ) : (
                              <span className="opacity-70">Not provided</span>
                            );
                          })()}
                        </li>
                        <li className="pt-2">
                          <details>
                            <summary className="cursor-pointer text-xs opacity-70 select-none">
                              Raw JSON
                            </summary>
                            <pre className="bg-muted mt-2 max-h-64 overflow-auto rounded-md p-2 text-xs">
                              {JSON.stringify(article, null, 2)}
                            </pre>
                          </details>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </ModalContent>

        <ModalFooter>
          <ModalClose>
            <span className="flex w-28 cursor-pointer items-center justify-center rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Close
            </span>
          </ModalClose>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default ProductDetailsModal;
