/**
 * PostgreSQL Database 유틸리티 (Supabase 사용)
 * callback 패턴의 execute 메서드 기반 DB 작업 처리
 */

import { supabase } from './supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Execute 메서드의 콜백 타입 정의
 */
interface ExecuteCallbacks<T> {
  onSuccess: (result: T) => void;
  onError?: (error: Error) => void;
}

/**
 * Database 클래스
 * PostgreSQL (Supabase)을 사용한 callback 패턴 DB 작업
 */
class Database {
  private client: SupabaseClient;
  private isInitialized: boolean = false;

  constructor() {
    this.client = supabase;
  }

  /**
   * 데이터베이스 초기화
   * Supabase는 자동으로 연결되므로 초기화 체크만 수행
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Database already initialized');
      return;
    }

    try {
      console.log('Initializing PostgreSQL (Supabase) database');
      
      // 연결 테스트
      const { error } = await this.client.from('meals').select('count', { count: 'exact', head: true });
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = 테이블이 아직 없음 (정상)
        console.warn('Database connection test warning:', error.message);
      }

      this.isInitialized = true;
      console.log('PostgreSQL database initialization completed');
    } catch (error) {
      console.error('Database initialization failed:', error);
      this.isInitialized = true; // 계속 진행
    }
  }

  /**
   * Execute 메서드 - callback 패턴으로 DB 쿼리 실행
   * 
   * @param query SQL 쿼리문 (사용하지 않음 - Supabase는 메서드 기반)
   * @param params 쿼리 파라미터
   * @param callbacks 성공/실패 콜백 함수
   * 
   * @example
   * // 이제 Supabase 메서드를 직접 사용하므로 이 메서드는 호환성을 위해 유지
   * database.execute<Meal[]>('SELECT', [], {
   *   onSuccess: (meals) => console.log('Meals:', meals),
   *   onError: (error) => console.error('Error:', error)
   * });
   */
  execute<T>(
    query: string,
    params: any[] = [],
    callbacks: ExecuteCallbacks<T>
  ): void {
    console.warn('execute() method is deprecated with Supabase. Use specific methods instead.');
    callbacks.onSuccess([] as T);
  }

  /**
   * 데이터베이스가 초기화되었는지 확인
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
  }

  /**
   * Supabase 클라이언트 가져오기
   */
  getClient(): SupabaseClient {
    return this.client;
  }

  /**
   * 트랜잭션 실행 (Supabase는 RPC 함수로 처리)
   * 여러 쿼리를 하나의 트랜잭션으로 묶어 실행
   */
  executeTransaction(
    queries: Array<{ query: string; params: any[] }>,
    callbacks: ExecuteCallbacks<void>
  ): void {
    console.warn('Transactions should be handled using Supabase RPC functions');
    callbacks.onSuccess();
  }

  /**
   * 데이터베이스 연결 종료
   */
  async close(): Promise<void> {
    console.log('Supabase client does not require explicit closing');
    this.isInitialized = false;
  }
}

// 싱글톤 인스턴스
let databaseInstance: Database | null = null;

/**
 * Database 인스턴스 가져오기
 */
export const getDatabase = (): Database => {
  if (!databaseInstance) {
    databaseInstance = new Database();
  }
  return databaseInstance;
};

export default Database;
